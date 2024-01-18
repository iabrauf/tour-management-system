using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tour_Management_System.Data;
using Tour_Management_System.Models; 
using Tour_Management_System.DTOs;

namespace Tour_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
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

        [Authorize(Roles = "User")]
        [HttpGet("bookedTours")]
        public async Task<ActionResult<IEnumerable<Tour>>> GetBookedTours()
        {
            try
            {
                // Retrieve the currently logged-in user's email directly from claims
                var userEmail = User.Identity.Name;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return BadRequest("User email not found.");
                }

                // Find user by email
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                // Retrieve the tours booked by the user
                var bookedTours = await _context.UserBookings
                    .Where(ub => ub.UserId == user.Id)
                    .Select(ub => ub.Tour)
                    .ToListAsync();

                return Ok(bookedTours);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "User")]
        [HttpPost("bookTour/{tourId}")]
        public async Task<ActionResult> BookTour(int tourId)
        {
            try
            {
                // Retrieve the currently logged-in user's email directly from claims
                var userEmail = User.Identity.Name;

                if (string.IsNullOrEmpty(userEmail))
                {
                    return BadRequest("User email not found.");
                }

                // Find user by email
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                // Find the tour by id
                var tour = await _context.Tours.FindAsync(tourId);

                if (tour == null)
                {
                    return NotFound("Tour not found.");
                }

                // Check if the user has already booked this tour
                var existingBooking = await _context.UserBookings
                    .FirstOrDefaultAsync(ub => ub.UserId == user.Id && ub.TourId == tour.Id);

                if (existingBooking != null)
                {
                    return BadRequest("You have already booked this tour.");
                }

                // Create a new booking entry
                var booking = new UserBooking
                {
                    UserId = user.Id,
                    TourId = tour.Id,
                    BookingDate = DateTime.UtcNow
                };

                _context.UserBookings.Add(booking);
                await _context.SaveChangesAsync();

                return Ok("Tour booked successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
