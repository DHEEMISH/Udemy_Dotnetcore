using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenServices : ITokenService
    {
        //Symetric key is a type of encyption where only 1 key will be used to both encyption and decryption the electronic info.
        // The key will be use for both side of JWT token and make sure the signature is verified.
        private readonly SymmetricSecurityKey _Key;
        public TokenServices(IConfiguration config )
        {
            _Key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            var claim=new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };
            
            var creds= new SigningCredentials(_Key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject=new ClaimsIdentity(claim),
                Expires= DateTime.Now.AddDays(7),
                SigningCredentials=creds
            };

            var tokenHandler=new JwtSecurityTokenHandler();
            var token=tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}