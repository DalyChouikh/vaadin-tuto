package dev.daly.contacts.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import dev.daly.contacts.data.Contact;
import dev.daly.contacts.data.ContactService;

@PageTitle("Contacts")
@Route(value = "contacts")
public class ContactsList extends VerticalLayout {
    Grid<Contact> contacts = new Grid<>(Contact.class);
    TextField filterText = new TextField();
    ContactForm form;
    private ContactService contactService;
    public ContactsList(ContactService contactService) {
        addClassName("contacts-list");
        setSizeFull();
        configureGrid();
        configureForm();
        add(
                getToolbar(),
                getContent()
        );
        updateList();
    }

    private void updateList() {
        contacts.setItems(contactService.findAllContacts(filterText.getValue()));
    }

    private Component getContent() {
        HorizontalLayout content = new HorizontalLayout(contacts, form);
        content.addClassName("content");
        content.setFlexGrow(2, contacts);
        content.setFlexGrow(1, form);
        content.setSizeFull();
        return content;
    }

    private void configureForm() {
        form = new ContactForm();
        form.setWidth("25em");
    }

    private Component getToolbar() {
        filterText.setPlaceholder("Filter by name...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> updateList());
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
