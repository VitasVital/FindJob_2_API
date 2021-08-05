using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Vacancy
    {
        public Vacancy()
        {
            ResponseFromClientToVacancies = new HashSet<ResponseFromClientToVacancy>();
            ResponseFromVacancyToClients = new HashSet<ResponseFromVacancyToClient>();
            VacancyKeySkills = new HashSet<VacancyKeySkill>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? CompanyId { get; set; }
        public string Description { get; set; }
        public int? CityId { get; set; }
        public string TelephoneNumber { get; set; }
        public string JobTitle { get; set; }
        public int? WorkScheduleId { get; set; }
        public string Requirements { get; set; }
        public string Duties { get; set; }
        public string Conditions { get; set; }
        public string Salary { get; set; }
        public string Photo { get; set; }
        public int? WorkExperienceId { get; set; }

        public virtual City City { get; set; }
        public virtual WorkExperience WorkExperience { get; set; }
        public virtual WorkSchedule WorkSchedule { get; set; }
        public virtual ICollection<ResponseFromClientToVacancy> ResponseFromClientToVacancies { get; set; }
        public virtual ICollection<ResponseFromVacancyToClient> ResponseFromVacancyToClients { get; set; }
        public virtual ICollection<VacancyKeySkill> VacancyKeySkills { get; set; }
    }
}
