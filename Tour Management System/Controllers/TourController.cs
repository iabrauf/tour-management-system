// TourController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tour_Management_System.Data;
using Tour_Management_System.Models;

namespace Tour_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly DataContext _context;

        public TourController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tour>>> GetAllTours()
        {
            var tours = await _context.Tours.ToListAsync();

            if (tours == null || tours.Count == 0)
            {
                return NotFound("No tours found.");
            }

            return Ok(tours);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tour>> GetTourById(int id)
        {
            var tour = await _context.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound("Tour not found.");
            }

            return Ok(tour);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("addTour")]
        public async Task<ActionResult<Tour>> AddTour(Tour tour)
        {
            try
            {

                _context.Tours.Add(tour);
                await _context.SaveChangesAsync();

                return Ok("Tour Added");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("updateTour/{id}")]
        public async Task<ActionResult<Tour>> UpdateTour(int id, Tour tour)
        {
            var existingTour = await _context.Tours.FindAsync(id);

            if (existingTour == null)
            {
                return NotFound("Tour not found.");
            }

            // Update properties based on your requirements
            existingTour.TourName = tour.TourName;
            existingTour.DepartureFrom = tour.DepartureFrom;
            existingTour.StartDate = tour.StartDate;
            existingTour.EndDate = tour.EndDate;
            existingTour.Price = tour.Price;

            await _context.SaveChangesAsync();

            return Ok("Tour Updated");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteTour/{id}")]
        public async Task<ActionResult<List<Tour>>> DeleteTour(int id)
        {
            var tour = await _context.Tours.FindAsync(id);

            if (tour == null)
            {
                return NotFound("Tour not found.");
            }

            _context.Tours.Remove(tour);
            await _context.SaveChangesAsync();

            return Ok(await _context.Tours.ToListAsync());
        }
    }
}
