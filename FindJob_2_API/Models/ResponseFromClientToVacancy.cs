using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class ResponseFromClientToVacancy
    {
        public int Id { get; set; }
        public int? ClientId { get; set; }
        public int? VacancyId { get; set; }
        public bool? IsAccepted { get; set; }
        public bool? IsResponsed { get; set; }

        public virtual Client Client { get; set; }
        public virtual Vacancy Vacancy { get; set; }
    }
}
