class DashboardPage
{
constructor(page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");

}

async searchProductAddCart(productName)
{
    await this.page
        .locator(".card-body")
        .filter({ hasText: productName })
        .getByRole("button", { name: "Add To Cart" })
        .click();

    await this.page.locator("#toast-container").waitFor();
}


async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}
module.exports = {DashboardPage};