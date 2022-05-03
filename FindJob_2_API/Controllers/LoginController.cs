using FindJob_2_API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace FindJob_2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private Find_JobDBContext _db;

        public LoginController(Find_JobDBContext context)
        {
            _db = context;
        }
        [HttpGet("{email}/{password}")]
        public JsonResult Get(string email, string password)
        {
            return new JsonResult(_db.Clients.FirstOrDefault(c => c.Email == email && c.Password == password && c.IsDeleted == false));
        }
        [Route("[action]/{id}")]
        [HttpGet]
        public JsonResult GetUser(int id)
        {
            var found_client = from client in _db.
                    Clients.
                    Where(c => c.Id == id)
                    join role in _db.Roles on client.RoleId equals role.Id
                    select new
                    {
                        client.Id,
                        client.Name,
                        client.Email,
                        client.Country,
                        client.Region,
                        DateBirth = client.DateBirth.ToString(),
                        client.TelephoneNumber,
                        client.CompanyId,
                        role_Id = role.Id,
                        role_Name = role.Name
                    }
                ;

            return new JsonResult(found_client.FirstOrDefault(c => c.Id == id));
        }

        [HttpPost]
        public JsonResult Post(Client client)
        {
            Client _client = _db.Clients.
                FirstOrDefault(c => c.Email == client.Email && c.Password == client.Password && c.IsDeleted == false);
            if (_client is null)
            {
                return new JsonResult("Нет данного пользователя");
            }
            return new JsonResult(_client.Id);
        }

        [HttpDelete("{email}/{password}")]
        public JsonResult Delete(string email, string password)
        {
            Client _client = _db.Clients.FirstOrDefault(c => c.Email == email && c.Password == password && c.IsDeleted == false);

            if (_client is null)
            {
                return new JsonResult("Нет пользователя");
            }
            _client.IsDeleted = true;
            _db.SaveChanges();

            return new JsonResult("Успушно удалён");
        }

        [HttpPut]
        public JsonResult Put(Client client)
        {
            Client _client = _db.Clients.FirstOrDefault(c => c.Id == client.Id);
            if (_client is null)
            {
                return new JsonResult("Нет пользователя");
            }
            _client.Name = client.Name;
            _client.Email = client.Email;
            _client.Password = client.Password;
            _client.Region = client.Region;
            _client.DateBirth = client.DateBirth;
            _client.Gender = client.Gender;
            _client.Country = client.Country;
            _client.TelephoneNumber = client.TelephoneNumber;
            _client.RoleId = client.RoleId;

            _db.SaveChanges();

            return new JsonResult("Данные успешно изменены");
        }
    }
}
