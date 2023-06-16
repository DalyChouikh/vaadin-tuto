package dev.daly.contacts.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import dev.daly.contacts.data.Contact;
import dev.daly.contacts.data.ContactService;


@PageTitle("Contacts")
@Route(value = "", layout = MainLayout.class)
public class ContactsList extends VerticalLayout {
    Grid<Contact> contacts = new Grid<>(Contact.class);
    TextField filterText = new TextField();
    ContactForm form;
    private final ContactService contactService;

    public ContactsList(ContactService contactService) {
        this.contactService = contactService;
        addClassName("contacts-list");
        setSizeFull();
        configureGrid();
        configureForm();
        add(
                getToolbar(),
                getContent()
        );
        updateList();
        closeEditor();
    }

    private void closeEditor() {
        form.setContact(null);
        form.setVisible(false);
        removeClassName("editing");
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
        form.addSaveListener(this::saveContact);
        form.addDeleteListener(this::deleteContact);
        form.addCloseListener(e -> closeEditor());
    }

    private void saveContact(ContactForm.SaveEvent event) {
        contactService.saveContact(event.getContact());
        updateList();
        closeEditor();
    }

    private void deleteContact(ContactForm.DeleteEvent event) {
        ConfirmDialog dialog = new ConfirmDialog();
        dialog.open();
        dialog.setHeader(String.format("Delete '%s %s'?",
                event.getContact().getFirstName(),
                event.getContact().getLastName()));
        dialog.setText(
                "Are you sure you want to permanently delete this contact?");
        dialog.setCancelable(true);
        dialog.addCancelListener(close -> dialog.close());
        dialog.setConfirmText("Delete");
        dialog.setConfirmButtonTheme("error primary");
        dialog.addConfirmListener(delete -> {
            contactService.deleteContact(event.getContact());
            dialog.close();
            updateList();
            closeEditor();
        });
    }

    private Component getToolbar() {
        filterText.setPlaceholder("Filter by name...");
        filterText.setClearButtonVisible(true);
        filterText.setValueChangeMode(ValueChangeMode.LAZY);
        filterText.addValueChangeListener(e -> updateList());

        Button addContactButton = new Button("Add contact");
        addContactButton.addClickListener(click -> addContact());

        HorizontalLayout toolbar = new HorizontalLayout(filterText, addContactButton);
        toolbar.addClassName("toolbar");

        return toolbar;
    }

    private void addContact() {
        contacts.asSingleSelect().clear();
        editContact(new Contact());
    }

    private void configureGrid() {
        contacts.addClassName("contacts-grid");
        contacts.setSizeFull();
        contacts.setColumns("firstName", "lastName", "email", "age", "phone");
        contacts.addItemDoubleClickListener(event -> editContact(event.getItem()));
        contacts.addComponentColumn(contact -> {
            Button editButton = new Button("Edit");
            editButton.addClickListener(click -> editContact(contact));
            return editButton;
        });
        contacts.getColumns().forEach(col -> col.setAutoWidth(true));
    }

    private void editContact(Contact contact) {
        if (contact == null) {
            closeEditor();
        } else {
            form.setContact(contact);
            form.setVisible(true);
            addClassName("editing");
        }
    }

}
