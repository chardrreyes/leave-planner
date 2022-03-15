using System;
using System.Collections.Generic;
using Data.Models;
using System.Linq;

namespace Repository
{
    public class EmployeeRepository
    {
        private LeavePlannerContext context = new LeavePlannerContext();
        public List<Employee> GetEmployees()
        {
            return context.Employee.ToList();
        }
    }


}
