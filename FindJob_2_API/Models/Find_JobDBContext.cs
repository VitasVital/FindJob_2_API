using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Find_JobDBContext : DbContext
    {
        public Find_JobDBContext()
        {
        }

        public Find_JobDBContext(DbContextOptions<Find_JobDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Citizenship> Citizenships { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Employment> Employments { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<KeySkill> KeySkills { get; set; }
        public virtual DbSet<Response> Responses { get; set; }
        public virtual DbSet<Resume> Resumes { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Vacancy> Vacancies { get; set; }
        public virtual DbSet<WorkSchedule> WorkSchedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-BH0GV9U\\MSSQLSERVER01;Database=Find_JobDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Citizenship>(entity =>
            {
                entity.ToTable("Citizenship");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.Property(e => e.DateBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TelephoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Employment>(entity =>
            {
                entity.ToTable("Employment");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.ToTable("Gender");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<KeySkill>(entity =>
            {
                entity.ToTable("Key_skills");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Response>(entity =>
            {
                entity.ToTable("Response");
            });

            modelBuilder.Entity<Resume>(entity =>
            {
                entity.ToTable("Resume");

                entity.Property(e => e.Education)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.JobTitle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Job_title");

                entity.Property(e => e.KeySkillsId).HasColumnName("Key_skillsId");

                entity.Property(e => e.Photo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Salary)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkExperience)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Work_experience");

                entity.Property(e => e.WorkScheduleId).HasColumnName("Work_scheduleId");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vacancy>(entity =>
            {
                entity.ToTable("Vacancy");

                entity.Property(e => e.Conditions).HasColumnType("text");

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.Duties).HasColumnType("text");

                entity.Property(e => e.JobTitle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Job_title");

                entity.Property(e => e.KeySkillsId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Key_skillsId");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Photo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Requirements).HasColumnType("text");

                entity.Property(e => e.Salary)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TelephoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkExperience)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Work_experience");

                entity.Property(e => e.WorkScheduleId).HasColumnName("Work_scheduleId");
            });

            modelBuilder.Entity<WorkSchedule>(entity =>
            {
                entity.ToTable("Work_schedule");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
