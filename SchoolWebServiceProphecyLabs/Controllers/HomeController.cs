using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.Data.SqlClient;
using SchoolWebServiceProphecyLabs.Data;

namespace SchoolWebServiceProphecyLabs.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public DataBase dataBase = new DataBase();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }



        [HttpPost]
        public IActionResult Register([FromBody] Userdata data) 
        {        
            return Ok(dataBase.Insert(data.login,data.email,data.password));
        }

        [HttpPost]
        public IActionResult LogIn([FromBody] Userdata data)
        {         
            return Ok(dataBase.Login(data.login, data.password)); 
        }
    }
    public class Userdata
    {
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }

}
