import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { AccountStatusGuard } from 'app/guards/accountstatus.guard';
import { NewAgentGuard } from 'app/guards/new-agent.guard';
import { RoleAuthGuard } from 'app/guards/role-auth.guard';
import { RoleType } from 'app/models/site-map.model';
import {Role} from 'app/models/site-map.model'

export const AdminLayoutRoutes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: () => import('app/pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AccountStatusGuard] },
            { path: 'users', loadChildren: () => import('app/pages/users/users.module').then(m => m.UsersModule), canActivate:[RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]}},
            { path: 'agents', loadChildren: () => import('app/pages/Agents/agents.module').then(m => m.AgentsModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]} },
            { path: 'leads', loadChildren: () => import('app/pages/lead/lead.module').then(m => m.LeadModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student,Role.Institute]}},
            { path: 'opportunities', loadChildren: () => import('app/pages/opportunities/opportunities.module').then(m => m.OpportunitiesModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
            { path: 'campaigns', loadChildren: () => import('app/pages/campaign/campaign.module').then(m => m.CampaignModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]} },
            { path: 'institutions', loadChildren: () => import('app/pages/institutions/institutions-routing.module').then(m => m.InstitutionsRoutingModule),canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student]}},
            { path: 'assigned-agent', loadChildren: () => import('app/pages/assigned-agents/assigned-agents.module').then(m => m.AssignedAgentsModule),canActivate: [RoleAuthGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
            { path: 'application', loadChildren: () => import('app/pages/application/application.module').then(m => m.ApplicationModule), canActivate: [AccountStatusGuard] },
            { path: 'invoice', loadChildren: () => import('app/pages/invoice/invoice.module').then(m => m.InvoiceModule),  canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]} },
            { path: 'students', loadChildren: () => import('app/pages/students/students.module').then(m => m.StudentsModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
            { path: 'eligibility', loadChildren: () => import('app/pages/eligibility/eligibility.module').then(m => m.EligibilityModule) },
            { path: 'role', loadChildren: () => import('app/pages/app-permission/app-permission.module').then(m => m.AppPermissionModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Admin]} },
            { path: 'program-search', loadChildren: () => import('app/pages/search-program/search-program.module').then(m => m.SearchProgramModule)},
            { path: 'unauthorized',loadChildren: () => import('app/pages/un-authorized/un-authorized.module').then(m => m.UnAuthorizedModule)},
            { path: 'import/:template', loadChildren: () => import('app/pages/import-data-ui/import-data-ui.module').then(m => m.ImportDataUiModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'profile', loadChildren: () => import('app/pages/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'change-password', loadChildren: () => import('app/pages/change-password/change-password.module').then(m => m.ChangePasswordModule) },
            { path: 'application-for-institution', loadChildren: () => import('app/pages/Agents/agent-application/agent-application-routing.module').then(m => m.AgentApplicationRoutingModule),canActivate:[RoleAuthGuard],data:{disallowedRole:[Role.Student]} },
            { path: 'mytodo', loadChildren: () => import('app/pages/my-todo-calendar/my-todo-calendar.module').then(m => m.MyTodoCalendarModule), canActivate: [AccountStatusGuard] },
            { path: 'retrieve', loadChildren: () => import('app/pages/retrieve/retrieve.module').then(m => m.RetrieveModule), canActivate: [AccountStatusGuard] },
            { path: 'news', loadChildren: () => import('app/pages/news/news.module').then(m => m.NewsModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'reports', loadChildren: () => import('app/pages/advance-report/advance-report.module').then(m => m.AdvanceReportModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]}},
            { path: 'fee-waiver', loadChildren: () => import('app/pages/agent-fee-waiver/agent-fee-waiver.module').then(m => m.AgentFeeWaiverModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}  },
            { path: 'partner-type', loadChildren: () => import('app/pages/PartnerTypes/partner-type.module').then(m => m.PartnerTypeModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}  },
            { path: 'agent-document', loadChildren: () => import('app/pages/Agent-Documnets/agent-document.module').then(m => m.AgentDocumentModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}  },
            { path: 'notification', loadChildren: () => import('app/pages/notification-manager/notification-manager.module').then(m => m.NotificationManagerModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'feedback', loadChildren: () => import('app/pages/feedback-report/feedback-report.module').then(m => m.FeedbackReportModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'import-batch', loadChildren: () => import('app/pages/extracting-xl/extracting-xl.module').then(m => m.ExtractingXlModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}  },
            { path: 'ticketing-sys', loadChildren: () => import('app/pages/ticketing-system/ticketing-system.module').then(m => m.TicketingSystemModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'user-task', loadChildren: () => import('app/pages/user-tasks/user-tasks.module').then(m => m.UserTasksModule),canActivate: [AccountStatusGuard]  },
            { path: 'evaluationform', loadChildren: () => import('app/pages/evaluation-form/evaluation-form.module').then(m => m.EvaluationFormModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student]}},
            { path: 'knowledge-centre', loadChildren: () => import('app/pages/knowledge-centre/knowledge-centre.module').then(m => m.KnowledgeCentreModule),  canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]}},
            
            { path: 'knowledgecentre', loadChildren: () => import('app/pages/knowledge-centre-display/knowledge-centre-display.module').then(m => m.KnowledgeCentreDisplayModule), canActivate: [AccountStatusGuard] },

            { path: 'activity', loadChildren: () => import('app/pages/campaign/campaign-activity/campaign-activity-routing.module').then(m => m.CampaignActivityRoutingModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'commission', loadChildren:()=> import('app/pages/Agents/commission/commission.module').then(m=>m.CommissionModule), canActivate: [RoleAuthGuard],data:{disallowedRole:[Role.Student]}  },
            { path: 'bulkupdate', loadChildren: () => import('app/pages/institutions/institution-program-status-update/institution-program-status-route').then(m => m.InstitutionProgramUpdateRoutingModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRoleType:[RoleType.Other]} },
            { path: 'kpi', loadChildren: () => import('app/pages/kpi-comparison-dashboard/kpi-comparison-dashboard.module').then(m => m.KpiComparisonDashboardModule), canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRoleType:[RoleType.MSMTeam]} },
            { path: 'refund', loadChildren:()=> import('app/pages/refund/refund.module').then(m=>m.RefundModule)  },
            { path: 'events', loadChildren: () => import('app/pages/event/event-routing.module ').then(m => m.EventRoutingModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{disallowedRole:[Role.Student,Role.Institute]} },
            { path: 'mydocument', loadChildren:()=> import('app/pages/my-document/my-document.module').then(m=>m.MyDocumentModule),canActivate: [RoleAuthGuard,AccountStatusGuard],data:{allowedRole:[Role.Student]} },

            { path: 'marketing-report', loadChildren:()=> import('app/pages/marketing-reports/marketing-reports.module').then(m=>m.MarketingReportsModule)},
            { path: 'user-notification', loadChildren:()=> import('app/pages/user-notification/user-notification.module').then(m=>m.UserNotificationModule)},
            { path: '**', redirectTo: 'dashboard' } 
      
        ]

    },
];
