using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using FindJob_2_API.Models;

namespace FindJob_2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public Find_JobDBContext _db;

        public ClientController(IConfiguration configuration, Find_JobDBContext context)
        {
            _configuration = configuration;
            _db = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_db.Clients.ToList());
        }


        [HttpPost]
        public JsonResult Post(Client client)
        {
            _db.Clients.Add(client);
            _db.SaveChanges();

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Client client)
        {
            _db.Clients.FirstOrDefault(c => c.Id == client.Id).Name = client.Name;
            _db.SaveChanges();

            return new JsonResult("Putted Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Client client = _db.Clients.FirstOrDefault(c => c.Id == id);

            _db.Clients.Remove(client);
            _db.SaveChanges();

            return new JsonResult("Deleted Successfully");
        }
    }
}
