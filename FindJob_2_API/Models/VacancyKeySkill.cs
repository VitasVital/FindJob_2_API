using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class VacancyKeySkill
    {
        public int Id { get; set; }
        public int? VacancyId { get; set; }
        public int? KeySkillsId { get; set; }

        public virtual KeySkill KeySkills { get; set; }
        public virtual Vacancy Vacancy { get; set; }
    }
}
