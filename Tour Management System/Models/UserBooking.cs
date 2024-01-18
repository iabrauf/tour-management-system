using System;

namespace Tour_Management_System.Models
{
    public class UserBooking
    {
        public int Id { get; set; }

        // Foreign key properties
        public int UserId { get; set; }
        public int TourId { get; set; }

        // Navigation properties
        public User? User { get; set; }
        public Tour? Tour { get; set; }

        public DateTime BookingDate { get; set; }
    }
}

