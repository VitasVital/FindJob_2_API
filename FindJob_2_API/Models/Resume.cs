using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Resume
    {
        public int Id { get; set; }
        public int? ClientId { get; set; }
        public string JobTitle { get; set; }
        public string Salary { get; set; }
        public int? EmploymentId { get; set; }
        public int? WorkScheduleId { get; set; }
        public string Photo { get; set; }
        public int? KeySkillsId { get; set; }
        public string Education { get; set; }
        public string WorkExperience { get; set; }
    }
}
