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
        public string City { get; set; }
        public DateTime? DateBirth { get; set; }
        public string Gender { get; set; }
        public string Citizenship { get; set; }
        public string TelephoneNumber { get; set; }
        public string Role { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<ResponseFromClientToVacancy> ResponseFromClientToVacancies { get; set; }
        public virtual ICollection<ResponseFromVacancyToClient> ResponseFromVacancyToClients { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
    }
}
