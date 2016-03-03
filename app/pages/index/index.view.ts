import { Page, NavController, Modal } from 'ionic-angular';
import { Type } from 'angular2/core';
import * as template from './index.view.html';

import { DashboardView } from 'pages/dashboard/dashboard.view.ts';
import { OrdersView } from 'pages/orders/orders.view.ts';
import { TransactionView } from 'pages/transaction/transaction.view.ts';
import { CustomersView } from 'pages/customers/customers.view.ts';
import { MoreView } from 'pages/more/more.view.ts';

@Page({
    template: template
})
export class IndexView {
    dashboardView: Type = DashboardView;
    ordersView: Type = OrdersView;
    customersView: Type = CustomersView;
    moreView: Type = MoreView;

    constructor(
        public nav: NavController
    ) {}

    showTransactionView() {
        const transactionModal = Modal.create(TransactionView);
        this.nav.present(transactionModal)
    }
};


