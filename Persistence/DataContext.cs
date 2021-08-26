using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    /// <summary>
    /// Step 2 Added Identity IdentityDbContext<AppUser> and the using
    /// using Microsoft.AspNetCore.Identity.EntityFrameworkCore; to to the DbContext
    /// </summary>
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Activity> Activities { get; set; }



    }
}