using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class KeySkill
    {
        public KeySkill()
        {
            ResumeKeySkills = new HashSet<ResumeKeySkill>();
            VacancyKeySkills = new HashSet<VacancyKeySkill>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ResumeKeySkill> ResumeKeySkills { get; set; }
        public virtual ICollection<VacancyKeySkill> VacancyKeySkills { get; set; }
    }
}
