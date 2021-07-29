using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class City
    {
        public City()
        {
            Clients = new HashSet<Client>();
            Vacancies = new HashSet<Vacancy>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Client> Clients { get; set; }
        public virtual ICollection<Vacancy> Vacancies { get; set; }
    }
}
