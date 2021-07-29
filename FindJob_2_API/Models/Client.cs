using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Client
    {
        public Client()
        {
            ResponseFromClientToVacancies = new HashSet<ResponseFromClientToVacancy>();
            ResponseFromVacancyToClients = new HashSet<ResponseFromVacancyToClient>();
            Resumes = new HashSet<Resume>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? CityId { get; set; }
        public DateTime? DateBirth { get; set; }
        public int? GenderId { get; set; }
        public int? CitizenshipId { get; set; }
        public string TelephoneNumber { get; set; }
        public int? RoleId { get; set; }

        public virtual Citizenship Citizenship { get; set; }
        public virtual City City { get; set; }
        public virtual Gender Gender { get; set; }
        public virtual Role Role { get; set; }
        public virtual ICollection<ResponseFromClientToVacancy> ResponseFromClientToVacancies { get; set; }
        public virtual ICollection<ResponseFromVacancyToClient> ResponseFromVacancyToClients { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
    }
}
