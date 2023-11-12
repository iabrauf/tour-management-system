using Microsoft.AspNetCore.Mvc;
using Tour_Management_System.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Tour_Management_System.DTOs;


namespace Tour_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;


        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User request)
        {
            try
            {
                // Validation checks
                if (request == null)
                {
                    return BadRequest("User data is null.");
                }

                if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.PasswordHash))
                {
                    return BadRequest("Name, Email, and Password are required.");
                }

                // Hash the password
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);

                // Create a new user instance
                User user = new User
                {
                    Name = request.Name,
                    Email = request.Email,
                    PasswordHash = passwordHash
                };

                // Check if the email is already registered
                if (_context.Users.Any(u => u.Email == user.Email))
                {
                    return BadRequest("Email is already registered.");
                }

                // Add the user to the context and save changes
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok("User Created");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO request)
        {
            try
            {
                // Validation checks
                if (request == null)
                {
                    return BadRequest("User data is null.");
                }

                if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.PasswordHash))
                {
                    return BadRequest("Email and Password are required.");
                }

                var getUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

                if (getUser == null)
                {
                    return NotFound("User Not Found");
                }

                // Check the password (replace this with your actual password verification logic)
                if (!BCrypt.Net.BCrypt.Verify(request.PasswordHash, getUser.PasswordHash))
                {
                    return BadRequest("Incorrect Password");
                }
                //return Ok(getUser);
                // Authentication successful
                var token = GenerateToken(getUser);
                var response = new TokenResponseDTO
                {
                    Token = token
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private string GenerateToken(User user)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            var signingCredentials = new SigningCredentials(
                            new SymmetricSecurityKey(key),
                            SecurityAlgorithms.HmacSha512Signature
                        );
            var subject = new ClaimsIdentity(new[]
            {
              new Claim(ClaimTypes.Email, user.Email),
              new Claim(ClaimTypes.Name, user.Name),
              new Claim(ClaimTypes.Role, user.Role),
            });
            var expires = DateTime.UtcNow.AddMinutes(10);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            return jwtToken;
      }

        }
    }
