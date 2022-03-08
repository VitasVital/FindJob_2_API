using System;
using System.Collections.Generic;

#nullable disable

namespace FindJob_2_API.Models
{
    public partial class Employment
    {
        public Employment()
        {
            Resumes = new HashSet<Resume>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool? IsDeleted { get; set; }

        public virtual ICollection<Resume> Resumes { get; set; }
    }
}
