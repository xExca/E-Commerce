<?php

namespace App\Enum;

enum PermissionEnum: string
{
    case ManageFeatures = 'manage_features';
    case ManageUsers = 'manage_users';
    case ManageComments = 'manage_comments';
    case ManagePosts = 'manage_posts';
    case upvoteDownvotePermission = 'update_downvote';
    case viewDashbaord = 'view_dashboard';
    case viewUser = 'view_user';
    case viewOrder = 'view_order';
    case viewSales = 'view_sales';
}
