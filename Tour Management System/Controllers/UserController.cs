using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tour_Management_System.DTOs;
using Tour_Management_System.Models;

namespace Tour_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public static User user = new User();
        private readonly DataContext _context;


        public UserController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Users")]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            try
            {
                var users = await _context.Users.ToListAsync();

                if (users == null || users.Count == 0)
                {
                    return NotFound("No users found.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("updateUserPassword")]
        public async Task<ActionResult<User>> UpdateUserPassword(PasswordUpdateDTO request)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (dbUser == null)
                return BadRequest("User not found.");

            if (string.IsNullOrWhiteSpace(request.OldPassword) || string.IsNullOrWhiteSpace(request.NewPassword))
            {
                return BadRequest("Old Password and New Password are required.");
            }

            if (request.OldPassword == request.NewPassword)
            {
                return BadRequest("Old Password and New Password should be different.");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.OldPassword, dbUser.PasswordHash))
            {
                return BadRequest("Incorrect Password");
            }

            if (request.NewPassword != null)
            {
                string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
                dbUser.PasswordHash = passwordHash;
            }

            dbUser.Email = request.Email;
            await _context.SaveChangesAsync();

            return Ok("Password has been Updated");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateUser/{id}")]
        public async Task<ActionResult<User>> UpdateUser(UserLoginDTO request, [FromRoute] int id)
        {
            var dbUser = await _context.Users.FindAsync(id);

            if (dbUser == null)
                return BadRequest("User not found.");
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.PasswordHash);
           

            dbUser.Email = request.Email;
            dbUser.PasswordHash = passwordHash;
            await _context.SaveChangesAsync();

            return Ok("User Updated");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteUser/{id}")]
        public async Task<ActionResult<List<User>>> DeleteUser(int id)
        {
            var dbUser = await _context.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found.");

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }
    }
}
