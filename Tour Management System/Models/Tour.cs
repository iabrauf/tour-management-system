using System;
namespace Tour_Management_System.Models
{
    public class Tour
    {
        public int Id { get; set; }
        public string TourName { get; set; } = string.Empty;
        public string DepartureFrom { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Price { get; set; }
    }
}


