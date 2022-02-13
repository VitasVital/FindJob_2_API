﻿using FindJob_2_API.Models;
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
        public Find_JobDBContext _db;

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
                    .Where(c => c.WorkScheduleId == workScheduleId
                               && (c.WorkExperienceId == workExperienceId || workExperienceId == 1)
                               && (c.MinSalary > minSalary || c.MaxSalary > minSalary)
                               )
                join company in _db.Companies
                    on vacancy.Id equals company.Id //into gj
                join workExperience in _db.WorkExperiences
                    on vacancy.Id equals workExperience.Id //into gj
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
                // from subpet in gj.DefaultIfEmpty()
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
                    // CompanyName = subpet.Name
                };
            
            return new JsonResult(vacancies);
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
            return new JsonResult("Вы уже откликнулись на вакансию раннее");
        }
    }
}
