using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class WorkExperience
    {
        public WorkExperience()
        {
            Resumes = new HashSet<Resume>();
            Vacancies = new HashSet<Vacancy>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Resume> Resumes { get; set; }
        public virtual ICollection<Vacancy> Vacancies { get; set; }
    }
}
