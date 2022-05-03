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

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Employment> Employments { get; set; }
        public virtual DbSet<KeySkill> KeySkills { get; set; }
        public virtual DbSet<ResponseFromClientToVacancy> ResponseFromClientToVacancies { get; set; }
        public virtual DbSet<ResponseFromVacancyToClient> ResponseFromVacancyToClients { get; set; }
        public virtual DbSet<Resume> Resumes { get; set; }
        public virtual DbSet<ResumeKeySkill> ResumeKeySkills { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Vacancy> Vacancies { get; set; }
        public virtual DbSet<VacancyKeySkill> VacancyKeySkills { get; set; }
        public virtual DbSet<WorkExperience> WorkExperiences { get; set; }
        public virtual DbSet<WorkSchedule> WorkSchedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-BH0GV9U;Database=Find_JobDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Cyrillic_General_CI_AS");

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("Client");

                entity.Property(e => e.CompanyId).HasColumnName("Company_Id");

                entity.Property(e => e.Country)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DateBirth).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((1))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.RoleId).HasColumnName("Role_Id");

                entity.Property(e => e.TelephoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("Company");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Employment>(entity =>
            {
                entity.ToTable("Employment");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<KeySkill>(entity =>
            {
                entity.ToTable("Key_skills");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ResponseFromClientToVacancy>(entity =>
            {
                entity.ToTable("Response_from_client_to_vacancy");

                entity.Property(e => e.IsAccepted).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsResponsed).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ResponseFromClientToVacancies)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_Response_from_client_to_vacancy_Client_Id");

                entity.HasOne(d => d.Vacancy)
                    .WithMany(p => p.ResponseFromClientToVacancies)
                    .HasForeignKey(d => d.VacancyId)
                    .HasConstraintName("FK_Response_from_client_to_vacancy_Vacancy_Id");
            });

            modelBuilder.Entity<ResponseFromVacancyToClient>(entity =>
            {
                entity.ToTable("Response_from_vacancy_to_client");

                entity.Property(e => e.IsAccepted).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsResponsed).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ResponseFromVacancyToClients)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_Response_from_vacancy_to_client_Client_Id");

                entity.HasOne(d => d.Vacancy)
                    .WithMany(p => p.ResponseFromVacancyToClients)
                    .HasForeignKey(d => d.VacancyId)
                    .HasConstraintName("FK_Response_from_vacancy_to_client_Vacancy_Id");
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

                entity.Property(e => e.Photo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkExperienceId).HasColumnName("Work_experienceId");

                entity.Property(e => e.WorkScheduleId).HasColumnName("Work_scheduleId");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Resumes)
                    .HasForeignKey(d => d.ClientId)
                    .HasConstraintName("FK_Resume_Client_Id");

                entity.HasOne(d => d.Employment)
                    .WithMany(p => p.Resumes)
                    .HasForeignKey(d => d.EmploymentId)
                    .HasConstraintName("FK_Resume_Employment_Id");

                entity.HasOne(d => d.WorkExperience)
                    .WithMany(p => p.Resumes)
                    .HasForeignKey(d => d.WorkExperienceId)
                    .HasConstraintName("FK_Resume_Work_experience_Id");

                entity.HasOne(d => d.WorkSchedule)
                    .WithMany(p => p.Resumes)
                    .HasForeignKey(d => d.WorkScheduleId)
                    .HasConstraintName("FK_Resume_Work_schedule_Id");
            });

            modelBuilder.Entity<ResumeKeySkill>(entity =>
            {
                entity.ToTable("Resume_Key_skills");

                entity.Property(e => e.KeySkillsId).HasColumnName("Key_skills_Id");

                entity.HasOne(d => d.KeySkills)
                    .WithMany(p => p.ResumeKeySkills)
                    .HasForeignKey(d => d.KeySkillsId)
                    .HasConstraintName("FK_Resume_Key_skills_Key_skills_Id");

                entity.HasOne(d => d.Resume)
                    .WithMany(p => p.ResumeKeySkills)
                    .HasForeignKey(d => d.ResumeId)
                    .HasConstraintName("FK_Resume_Key_skills_Resume_Id");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.HasIndex(e => e.Id, "Role_Id_uindex")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .HasMaxLength(36)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vacancy>(entity =>
            {
                entity.ToTable("Vacancy");

                entity.Property(e => e.Conditions).HasColumnType("text");

                entity.Property(e => e.Country)
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.Duties).HasColumnType("text");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.JobTitle)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("Job_title");

                entity.Property(e => e.MaxSalary).HasColumnName("max_Salary");

                entity.Property(e => e.MinSalary).HasColumnName("min_Salary");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Photo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .HasMaxLength(36)
                    .IsUnicode(false);

                entity.Property(e => e.Requirements).HasColumnType("text");

                entity.Property(e => e.TelephoneNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.WorkExperienceId).HasColumnName("Work_experienceId");

                entity.Property(e => e.WorkScheduleId).HasColumnName("Work_scheduleId");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Vacancies)
                    .HasForeignKey(d => d.CompanyId)
                    .HasConstraintName("FK_Vacancy_Company_Id");

                entity.HasOne(d => d.WorkExperience)
                    .WithMany(p => p.Vacancies)
                    .HasForeignKey(d => d.WorkExperienceId)
                    .HasConstraintName("FK_Vacancy_Work_experience_Id");

                entity.HasOne(d => d.WorkSchedule)
                    .WithMany(p => p.Vacancies)
                    .HasForeignKey(d => d.WorkScheduleId)
                    .HasConstraintName("FK_Vacancy_Work_schedule_Id");
            });

            modelBuilder.Entity<VacancyKeySkill>(entity =>
            {
                entity.ToTable("Vacancy_Key_skills");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.KeySkillsId).HasColumnName("Key_skillsId");

                entity.HasOne(d => d.KeySkills)
                    .WithMany(p => p.VacancyKeySkills)
                    .HasForeignKey(d => d.KeySkillsId)
                    .HasConstraintName("FK_Vacancy_Key_skills_Key_skills_Id");

                entity.HasOne(d => d.Vacancy)
                    .WithMany(p => p.VacancyKeySkills)
                    .HasForeignKey(d => d.VacancyId)
                    .HasConstraintName("FK_Vacancy_Key_skills_Vacancy_Id");
            });

            modelBuilder.Entity<WorkExperience>(entity =>
            {
                entity.ToTable("Work_experience");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<WorkSchedule>(entity =>
            {
                entity.ToTable("Work_schedule");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
