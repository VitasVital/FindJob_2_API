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
        [HttpGet("{email}/{password}")]
        public JsonResult Get(string email, string password)
        {
            return new JsonResult(_db.Clients.FirstOrDefault(c => c.Email == email && c.Password == password && c.IsDeleted != true));
        }

        [HttpPost]
        public JsonResult Post(Client client)
        {
            Client _client = _db.Clients.
                FirstOrDefault(c => c.Email == client.Email && c.Password == client.Password && c.IsDeleted != true);
            if (_client is null)
            {
                return new JsonResult("Нет данного пользователя");
            }
            else
            {
                return new JsonResult("Успешная авторизация");
            }
        }

        [HttpDelete("{email}/{password}")]
        public JsonResult Delete(string email, string password)
        {
            Client client = _db.Clients.FirstOrDefault(c => c.Email == email && c.Password == password && c.IsDeleted != true);


            if (client is null)
            {
                return new JsonResult("Нет пользователя");
            }
            else
            {
                _db.Clients.FirstOrDefault(c => c.Email == email && c.Password == password).IsDeleted = true;
                _db.SaveChanges();

                return new JsonResult("Успушно удалён");
            }
            
        }

        [HttpPut]
        public JsonResult Put(Client client)
        {
            //доработать, не всё изменяется
            Client _client = _db.Clients.FirstOrDefault(c => c.Email == client.Email && c.Password == client.Password);
            _client.Name = client.Name;
            _client.Email = client.Email;
            _client.Password = client.Password;
            _client.City = client.City;
            _client.DateBirth = client.DateBirth;
            _client.Gender = client.Gender;
            _client.Citizenship = client.Citizenship;
            _client.TelephoneNumber = client.TelephoneNumber;
            _client.Role = client.Role;

            //_db.Clients.FirstOrDefault(c => c.Email == client.Email && c.Password == client.Password).Name = client.Name;
            _db.SaveChanges();

            return new JsonResult("Данные успешно изменены");
        }
    }
}
