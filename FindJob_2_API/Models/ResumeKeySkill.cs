using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class ResumeKeySkill
    {
        public int Id { get; set; }
        public int? ResumeId { get; set; }
        public int? KeySkillsId { get; set; }

        public virtual KeySkill KeySkills { get; set; }
        public virtual Resume Resume { get; set; }
    }
}
