using FindJob_2_API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FindJob_2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacancyController : Controller
    {
        private Find_JobDBContext _db;

        public VacancyController(Find_JobDBContext context)
        {
            _db = context;
        }

        [Route("[action]/{workScheduleId}/{workExperienceId}/{minSalary}/{inputSearch}/{country}/{region}")]
        [HttpGet]
        public JsonResult GetVacanciesWithParams(int workScheduleId, 
            int workExperienceId, 
            int minSalary, 
            string inputSearch, 
            string country, 
            string region)
        {
            var vacancies = from vacancy in _db.
                    Vacancies
                    .Where(c => (c.WorkScheduleId == workScheduleId || workScheduleId == 1)
                               && (c.WorkExperienceId == workExperienceId || workExperienceId == 1)
                               && (c.MinSalary > minSalary || c.MaxSalary > minSalary)
                               )
                join company in _db.Companies
                    on vacancy.CompanyId equals company.Id
                join workExperience in _db.WorkExperiences
                    on vacancy.WorkExperienceId equals workExperience.Id
                where (
                          (EF.Functions.Like(vacancy.Name.ToLower(), $"%{inputSearch.ToLower()}%")
                       || EF.Functions.Like(inputSearch.ToLower(), "%" + vacancy.Name.ToLower() + "%")
                       || inputSearch.ToLower() == "пусто")
                    || 
                        (EF.Functions.Like(company.Name.ToLower(), $"%{inputSearch.ToLower()}%")
                        || EF.Functions.Like(inputSearch.ToLower(), "%" + company.Name.ToLower() + "%")
                        || inputSearch.ToLower() == "пусто")
                    )
                    &&
                        (EF.Functions.Like(vacancy.Country.ToLower(), $"%{country.ToLower()}%")
                         || EF.Functions.Like(country.ToLower(), "%" + vacancy.Country.ToLower() + "%")
                         || country.ToLower() == "пусто")
                    &&
                        (EF.Functions.Like(vacancy.Region.ToLower(), $"%{region.ToLower()}%")
                         || EF.Functions.Like(region.ToLower(), "%" + vacancy.Region.ToLower() + "%")
                         || region.ToLower() == "пусто")
                select new
                {
                    vacancy.Id, 
                    vacancy.Name, 
                    vacancy.MinSalary, 
                    vacancy.MaxSalary, 
                    vacancy.Description, 
                    vacancy.Region, 
                    CompanyName = company.Name,
                    WorkExperience = workExperience.Name
                };
            
            return new JsonResult(vacancies);
        }
        
        [Route("[action]/{id}")]
        [HttpGet]
        public JsonResult GetVacancy(int id)
        {
            Vacancy vacancy = _db.Vacancies.FirstOrDefault(c => c.Id == id && c.IsDeleted == false);

            return new JsonResult(vacancy);
        }
        
        [HttpPost]
        public JsonResult Post(ResponseFromClientToVacancy resp)
        {
            //сделать проверку на отклик раннее
            ResponseFromClientToVacancy isResponsed =
                _db.ResponseFromClientToVacancies.
                FirstOrDefault(c => c.ClientId == resp.ClientId && 
                                    c.VacancyId == resp.VacancyId && 
                                    c.IsDeleted == false);
            if (isResponsed is null)
            {
                _db.ResponseFromClientToVacancies.Add(resp);
                _db.SaveChanges();

                return new JsonResult("Ответ отправлен");
            }
            return new JsonResult("Вы уже откликнулись на вакансию раннее");
        }
        
        [Route("[action]/{clientId}")]
        [HttpGet]
        public JsonResult GetClientVacancies(int clientId)
        {
            var vacancies = from vacancy in _db.Vacancies
                join company in _db.Companies
                    on vacancy.CompanyId equals company.Id
                join client in _db.Clients
                    on company.Id equals client.CompanyId
                join workExperience in _db.WorkExperiences
                    on vacancy.WorkExperienceId equals workExperience.Id
                where (client.Id == clientId && vacancy.IsDeleted == false)
                select new
                {
                    vacancyId = vacancy.Id, 
                    vacancy.Name, 
                    vacancy.MinSalary, 
                    vacancy.MaxSalary, 
                    vacancy.Description, 
                    vacancy.Region, 
                    CompanyName = company.Name,
                    WorkExperience = workExperience.Name
                };
            
            return new JsonResult(vacancies);
        }
        
        [Route("[action]/{vacancyId}/{companyId}")]
        [HttpGet]
        public JsonResult GetResponseFromClientToVacancy(int vacancyId, int companyId)
        {
            var responces = from responce in _db.ResponseFromClientToVacancies
                join client in _db.Clients
                    on responce.ClientId equals client.Id
                join vacancy in _db.Vacancies
                    on responce.VacancyId equals vacancy.Id
                where ((responce.VacancyId == vacancyId || vacancyId == 0) && client.CompanyId == companyId && responce.IsDeleted == false)
                select new
                {
                    client.Id, 
                    vacancyName = vacancy.Name,
                    client.Name, 
                    client.Email, 
                    client.Country,
                    client.Region, 
                    DateBirth = client.DateBirth.ToString(),
                    client.Gender,
                    client.TelephoneNumber
                };
            
            return new JsonResult(responces);
        }
        
        [Route("[action]")]
        [HttpPost]
        public JsonResult CreateNewVacancy(Vacancy vacancy)
        {
            _db.Vacancies.Add(vacancy);
            _db.SaveChanges();
            return new JsonResult("Вакансия успешно создана");
        }
    }
}
