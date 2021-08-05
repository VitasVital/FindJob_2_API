using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Resume
    {
        public Resume()
        {
            ResumeKeySkills = new HashSet<ResumeKeySkill>();
        }

        public int Id { get; set; }
        public int? ClientId { get; set; }
        public string JobTitle { get; set; }
        public string Salary { get; set; }
        public int? EmploymentId { get; set; }
        public int? WorkScheduleId { get; set; }
        public string Photo { get; set; }
        public string Education { get; set; }
        public int? WorkExperienceId { get; set; }

        public virtual Client Client { get; set; }
        public virtual Employment Employment { get; set; }
        public virtual WorkExperience WorkExperience { get; set; }
        public virtual WorkSchedule WorkSchedule { get; set; }
        public virtual ICollection<ResumeKeySkill> ResumeKeySkills { get; set; }
    }
}
