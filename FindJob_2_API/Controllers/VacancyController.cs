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
    public class VacancyController : Controller
    {
        public Find_JobDBContext _db;

        public VacancyController(Find_JobDBContext context)
        {
            _db = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(_db.Vacancies.ToList());
        }
        [Route("[action]/{id}")]
        [HttpGet]
        public JsonResult GetVacancy(int id)
        {
            Vacancy vacancy = _db.Vacancies.FirstOrDefault(c => c.Id == id);

            return new JsonResult(vacancy);
        }
        [HttpPost]
        public JsonResult Post(ResponseFromClientToVacancy resp)
        {
            //сделать проверку на отклик раннее
            ResponseFromClientToVacancy isResponsed =
                _db.ResponseFromClientToVacancies.
                FirstOrDefault(c => c.ClientId == resp.ClientId && c.VacancyId == resp.VacancyId);
            if (isResponsed is null)
            {
                _db.ResponseFromClientToVacancies.Add(resp);
                _db.SaveChanges();

                return new JsonResult("Ответ отправлен");
            }
            else
            {
                return new JsonResult("Вы уже откликнулись на вакансию раннее");
            }
        }
    }
}
