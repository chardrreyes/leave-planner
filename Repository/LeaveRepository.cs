﻿using System;
using System.Collections.Generic;
using Data.Models;
using System.Linq;

namespace Repository
{
    public class LeaveRepository
    {
        private LeavePlannerContext context = new LeavePlannerContext();

        public void addLeave(Leave leave) {
            this.context.Leave.Add(leave);
            this.context.SaveChanges();
        }
    }
}
