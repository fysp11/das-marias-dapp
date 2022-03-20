function RouterPage({ open, onOpenChange }) {
  return <Router>
    <Drawer
      // sidebar={sidebar}
      open={open}
      onOpenChange={ onOpenChange }
      sidebarStyle={{ backgroundColor: "white", width: "60%",}}
    >
        <Route path="/" exact component={IndexPage} />
        <Route path="/programa" exact component={AddPage} />
        <Switch>
          <Route path="/detail" exact component={DetailPage} />
          <Route path="/add" exact component={AddPage} />
          <Route path="/search" exact component={SearchPage} />
        </Switch>
    </Drawer>
  </Router>
}