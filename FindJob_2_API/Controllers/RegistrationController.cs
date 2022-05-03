using FindJob_2_API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FindJob_2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private Find_JobDBContext _db;

        public RegistrationController(Find_JobDBContext context)
        {
            _db = context;
        }

        [HttpPost]
        public JsonResult Post(Client client)
        {
            Client _client = _db.Clients.
                FirstOrDefault(c => c.Email == client.Email && c.IsDeleted == false);
            if (_client is null)
            {
                _db.Clients.Add(client);
                _db.SaveChanges();
                return new JsonResult("Успешная регистрация");
            }
            return new JsonResult("Данный пользователь уже зарегистрирован");
        }
    }
}
