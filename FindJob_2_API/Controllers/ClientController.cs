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
using Microsoft.EntityFrameworkCore;

namespace FindJob_2_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private Find_JobDBContext _db;

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
        
        [Route("[action]/{clientId}")]
        [HttpGet]
        public JsonResult GetResume(int clientId)
        {
            var resumeClient = from resume in _db.
                    Resumes
                    .Where(c => c.ClientId == clientId)
                join client in _db.Clients
                    on resume.ClientId equals client.Id
                join employment in _db.Employments
                    on resume.EmploymentId equals employment.Id
                join workSchedule in _db.WorkSchedules
                    on resume.WorkScheduleId equals workSchedule.Id
                join workExperience in _db.WorkExperiences
                    on resume.WorkExperienceId equals workExperience.Id
                select new
                {
                    resumeId = resume.Id,
                    client.Name,
                    client.Email,
                    client.Country,
                    client.Region,
                    DateBirth = client.DateBirth.ToString(),
                    client.Gender,
                    client.TelephoneNumber,
                    resume.JobTitle,
                    resume.Salary,
                    employmentName = employment.Name,
                    workScheduleName = workSchedule.Name,
                    resume.Education,
                    workExperienceName = workExperience.Name
                };

            return new JsonResult(resumeClient.FirstOrDefault());
        }
        
        [Route("[action]")]
        [HttpPost]
        public JsonResult CreateNewResume(Resume resume)
        {
            _db.Resumes.Add(resume);
            _db.SaveChanges();
            return new JsonResult("Резюме успешно создано");
        }
        
        [Route("[action]/{workScheduleId}/{workExperienceId}/{minSalary}/{inputSearch}/{country}/{region}")]
        [HttpGet]
        public JsonResult GetResumesWithParams(int workScheduleId, 
            int workExperienceId, 
            int minSalary, 
            string inputSearch, 
            string country, 
            string region)
        {
            var resumes = from resume in _db.
                    Resumes
                    .Where(c => (c.WorkScheduleId == workScheduleId || workScheduleId == 1)
                               && (c.WorkExperienceId == workExperienceId || workExperienceId == 1)
                               && c.Salary > minSalary
                               )
                join client in _db.Clients
                    on resume.ClientId equals client.Id
                join workExperience in _db.WorkExperiences
                    on resume.WorkExperienceId equals workExperience.Id
                join employment in _db.Employments
                    on resume.EmploymentId equals employment.Id
                join workSchedule in _db.WorkSchedules
                    on resume.EmploymentId equals workSchedule.Id
                where (
                          EF.Functions.Like(resume.JobTitle.ToLower(), $"%{inputSearch.ToLower()}%")
                       || EF.Functions.Like(inputSearch.ToLower(), "%" + resume.JobTitle.ToLower() + "%")
                       || inputSearch.ToLower() == "пусто"
                    )
                    &&
                        (EF.Functions.Like(client.Country.ToLower(), $"%{country.ToLower()}%")
                         || EF.Functions.Like(country.ToLower(), "%" + client.Country.ToLower() + "%")
                         || country.ToLower() == "пусто")
                    &&
                        (EF.Functions.Like(client.Region.ToLower(), $"%{region.ToLower()}%")
                         || EF.Functions.Like(region.ToLower(), "%" + client.Region.ToLower() + "%")
                         || region.ToLower() == "пусто")
                select new
                {
                    client.Id,
                    client.Name,
                    resume.JobTitle, 
                    resume.Salary, 
                    resume.Education, 
                    client.Country, 
                    client.Region, 
                    WorkExperience = workExperience.Name,
                    Employment = employment.Name,
                    WorkSchedule = workSchedule.Name
                };
            
            return new JsonResult(resumes);
        }
    }
}
