using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Gender
    {
        public Gender()
        {
            Clients = new HashSet<Client>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Client> Clients { get; set; }
    }
}
