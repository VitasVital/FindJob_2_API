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
    public class LoginController : Controller
    {
        public Find_JobDBContext _db;

        public LoginController(Find_JobDBContext context)
        {
            _db = context;
        }

        [HttpPost]
        public JsonResult Post(Client client)
        {
            Client _client = _db.Clients.
                FirstOrDefault(c => c.Email == client.Email && c.Password == client.Password);
            if (_client is null)
            {
                return new JsonResult("Нет данного пользователя");
            }
            else
            {
                return new JsonResult("Успешная авторизация");
            }
        }
    }
}
