package dev.daly.contacts.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import dev.daly.contacts.data.Contact;

@PageTitle("Contacts")
@Route(value = "contacts")
public class ContactsList extends VerticalLayout {
    Grid<Contact> contacts = new Grid<>(Contact.class);
    TextField filterText = new TextField();

    public ContactsList() {
        addClassName("contacts-list");
        setSizeFull();
        configureGrid();
        add(
                getToolbar(),
                contacts
        );
    }

    private Component getToolbar() {
        filterText.setPlaceholder("Filter by name...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);

        Button addContactButton = new Button("Add contact");
        HorizontalLayout toolbar = new HorizontalLayout(filterText, addContactButton);
        toolbar.addClassName("toolbar");
        return toolbar;
    }

    private void configureGrid() {
        contacts.addClassName("contacts-grid");
        contacts.setSizeFull();
        contacts.setColumns("firstName", "lastName", "age", "phone");
        contacts.getColumns().forEach(col -> col.setAutoWidth(true));
    }

}
