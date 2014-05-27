<div id="message-<%= id %>" class="message <% if (unread || expanded){ %>expanded<% } else { %>collapsed<% } %>" data-id="<%= id %>">
    <div id="message-text-<%= id %>" class="text">
        <%= message %>
    </div>
</div>