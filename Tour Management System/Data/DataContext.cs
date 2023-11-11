using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Tour_Management_System.Data;
using Tour_Management_System.Models;

namespace Tour_Management_System.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
    }
}
