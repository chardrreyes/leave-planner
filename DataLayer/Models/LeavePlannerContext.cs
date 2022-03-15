using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Data.Models
{
    public partial class LeavePlannerContext : DbContext
    {
        public LeavePlannerContext()
        {
        }

        public LeavePlannerContext(DbContextOptions<LeavePlannerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<Leave> Leave { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var path ="Server = (LocalDB)\\MSSQLLocalDB; AttachDbFilename ="+ Environment.CurrentDirectory + "\\LeaveData.mdf; Trusted_Connection = True;";
                optionsBuilder.UseSqlServer(path);
            }
        }

             
    }
}
