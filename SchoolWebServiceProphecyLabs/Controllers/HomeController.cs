using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.Data.SqlClient;
using SchoolWebServiceProphecyLabs.Data;
using SchoolWebServiceProphecyLabs.SignalR;
namespace SchoolWebServiceProphecyLabs.Controllers
{
    public interface ITeamService
    {
        Dictionary<string, List<string>> Teams { get; set; }
    }

    public class TeamService : ITeamService
    {
        public Dictionary<string, List<string>> Teams { get; set; }
        public TeamService()
        {
            Teams = new Dictionary<string, List<string>>();
        }
    }

    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public DataBase dataBase = new DataBase();
        private readonly ITeamService _teamService;

        public HomeController(ILogger<HomeController> logger, ITeamService teamService)
        {
            _logger = logger;
            _teamService = teamService;
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
            return Ok(dataBase.InsertUser(data.login, data.email, data.password));
        }

        [HttpPost]
        public IActionResult LogIn([FromBody] Userdata data)
        {
            return Ok(dataBase.Login(data.login, data.password));
        }

        [HttpGet]
        public IActionResult LobbyCreate()
        {
            var teamCode = GenerateTeamCode(5);
            _teamService.Teams[teamCode] = new List<string>();
            return Ok(teamCode);
        }

        private string GenerateTeamCode(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
    public class Userdata
    {
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }

}
