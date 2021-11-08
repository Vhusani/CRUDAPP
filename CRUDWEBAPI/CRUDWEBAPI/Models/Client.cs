using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDWEBAPI.Models
{
    public class Client
    {
        public int clientId  { get;  set; }

        public string clientName { get; set; }

        public string clientSurname { get; set; }
         
        public string clientPhone { get; set; }

        public string clientDOB { get; set; }

        public string clientAddress { get; set; }

        public string clientPhoto { get; set; }

    }
}
