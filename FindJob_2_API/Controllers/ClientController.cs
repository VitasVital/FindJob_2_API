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
        
        [Route("[action]/{id}")]
        [HttpGet]
        public JsonResult GetResponcesClient(int id)
        {
            var vacancies = from clientResponces in _db.
                    ResponseFromClientToVacancies
                    .Where(c => c.ClientId == id && c.IsDeleted == false)
                join vacancy in _db.Vacancies.Where(c => c.IsDeleted == false)
                    on clientResponces.VacancyId equals vacancy.Id
                join company in _db.Companies
                    on vacancy.Id equals company.Id
                join workExperience in _db.WorkExperiences.Where(c => c.IsDeleted == false)
                    on vacancy.Id equals workExperience.Id
                select new
                {
                    clientResponcesId = clientResponces.Id, 
                    vacancyId = vacancy.Id, 
                    vacancy.Name, 
                    vacancy.MinSalary, 
                    vacancy.MaxSalary, 
                    vacancy.Description, 
                    vacancy.Region, 
                    CompanyName = company.Name,
                    WorkExperience = workExperience.Name,
                    isAccepted = (clientResponces.IsResponsed == true ? 
                        (clientResponces.IsResponsed == true ? "Принято" : "Отказ") 
                        : "Работодатель ещё не откликнулся")
                };

            return new JsonResult(vacancies);
        }
        
        [Route("[action]/{idResponce}")]
        [HttpDelete]
        public JsonResult DeleteResponceClient(int idResponce)
        {
            ResponseFromClientToVacancy response = _db.
                ResponseFromClientToVacancies.
                FirstOrDefault(c => c.Id == idResponce && c.IsDeleted == false);

            if (response is null)
            {
                return new JsonResult("Нет данного отклика");
            }
            response.IsDeleted = true;
            _db.SaveChanges();

            return new JsonResult("Успушно удалён отклик");
        }
    }
}
