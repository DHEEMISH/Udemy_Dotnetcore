using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
        }


        [HttpPost("register")]
          public async Task<ActionResult<AppUser>> Registers(string userName,string password)
        {
           using var hwin=new HMACSHA512();
            var user=new AppUser
            {
                UserName=userName,
                passwordHash=hwin.ComputeHash(Encoding.UTF8.GetBytes(password)),
                passwordSalt=hwin.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
 
    }
}