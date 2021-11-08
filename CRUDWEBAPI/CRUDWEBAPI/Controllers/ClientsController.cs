using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CRUDWEBAPI.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace CRUDWEBAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public ClientsController(IConfiguration configuration, IWebHostEnvironment env) {

            _configuration = configuration;
            _env = env;
        }

        ///GET
        [HttpGet]
        public JsonResult Get() {

            string query =
                @"SELECT clientId, clientName, clientSurname, clientPhone, convert(varchar(10), clientDOB, 120) as clientDOB, clientAddress, clientPhoto
                from dbo.clientsDetails";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("IdentityConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource)) {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon)) {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        //POST
        [HttpPost]
        public JsonResult Post(Client client)
        {
            string query =
                @"INSERT INTO dbo.clientsDetails values (@clientName, @clientSurname, @clientPhone, @clientDOB, @clientAddress, 
                @clientPhoto)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("IdentityConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@clientName", client.clientName);
                    myCommand.Parameters.AddWithValue("@clientSurname", client.clientSurname);
                    myCommand.Parameters.AddWithValue("@clientPhone", client.clientPhone);
                    myCommand.Parameters.AddWithValue("@clientDOB", client.clientDOB);
                    myCommand.Parameters.AddWithValue("@clientAddress", client.clientAddress);
                    myCommand.Parameters.AddWithValue("@clientPhoto", client.clientPhoto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }


        //PUT
        [HttpPut]
        public JsonResult Put(Client client)
        {
            string query =
                @"UPDATE dbo.clientsDetails set 
                    clientName = @clientName, 
                    clientSurname = @clientSurname, 
                    clientPhone = @clientPhone, 
                    clientDOB = @clientDOB, 
                    clientAddress = @clientAddress, 
                    clientPhoto= @clientPhoto
                    WHERE clientId = @clientId  
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("IdentityConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@clientId", client.clientId);
                    myCommand.Parameters.AddWithValue("@clientName", client.clientName);
                    myCommand.Parameters.AddWithValue("@clientSurname", client.clientSurname);
                    myCommand.Parameters.AddWithValue("@clientPhone", client.clientPhone);
                    myCommand.Parameters.AddWithValue("@clientDOB", client.clientDOB);
                    myCommand.Parameters.AddWithValue("@clientAddress", client.clientAddress);
                    myCommand.Parameters.AddWithValue("@clientPhoto", client.clientPhoto);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            } 
            return new JsonResult("Updated Successfully");
        }


        //DELETE
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query =
                @"DELETE FROM dbo.clientsDetails WHERE clientId = @clientId  
                ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("IdentityConnection");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@clientId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }


        //Photos
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile() {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create)) {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
 