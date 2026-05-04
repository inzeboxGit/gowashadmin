<template>
  <PageBreadcrumb title="Dropdowns" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Single Button Dropdowns" isTogglable>
        <BRow>
          <div class="col-auto">
            <BDropdown variant="light" text="Choose Option">
              <BDropdownItem>Profile Settings</BDropdownItem>
              <BDropdownItem>Notifications</BDropdownItem>
              <BDropdownItem>Logout</BDropdownItem>
            </BDropdown>
          </div>

          <div class="col-auto">
            <BDropdown variant="primary" text="Quick Actions">
              <BDropdownItem>Create New</BDropdownItem>
              <BDropdownItem>Upload File</BDropdownItem>
              <BDropdownItem>View Reports</BDropdownItem>
            </BDropdown>
          </div>
        </BRow>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Menu Alignment" isTogglable>
        <BDropdown variant="light" text="Right-aligned menu">
          <BDropdownItem>Action</BDropdownItem>
          <BDropdownItem>Another action</BDropdownItem>
          <BDropdownItem>Something else here</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Custom Dropdown Arrow" isTogglable>
        <BRow>
          <div class="col-auto">
            <BDropdown variant="primary" toggle-class="drop-arrow-none" text="Without Arrow">
              <BDropdownItem href="#">Download Report</BDropdownItem>
              <BDropdownItem href="#">View Analytics</BDropdownItem>
              <BDropdownItem href="#">Export Data</BDropdownItem>
            </BDropdown>
          </div>

          <div class="col-auto">
            <BDropdown variant="outline-primary" toggle-class="drop-arrow-none">
              <template #button-content>
                Custom Icon
                <Icon icon="chevron-down" class="align-middle ms-1" />
              </template>
              <BDropdownItem href="#">Edit Profile</BDropdownItem>
              <BDropdownItem href="#">Account Settings</BDropdownItem>
              <BDropdownItem href="#">Sign Out</BDropdownItem>
            </BDropdown>
          </div>
        </BRow>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Split Button Dropdowns" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown split text="Primary" variant="primary" class="drop-arrow-none">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown split text="Secondary" variant="light">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown split text="Success" class="btn-soft-success drop-arrow-none">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown split text="Info" variant="info">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Variant" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown text="Primary" variant="primary" class="btn-group">
            <BDropdownItem href="">Create New</BDropdownItem>
            <BDropdownItem href="">Save Changes</BDropdownItem>
            <BDropdownItem href="">Publish Now</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">View Drafts</BDropdownItem>
          </BDropdown>

          <BDropdown text="Secondary" variant="light" class="btn-group">
            <BDropdownItem href="#">Settings</BDropdownItem>
            <BDropdownItem href="#">Preferences</BDropdownItem>
            <BDropdownItem href="#">Account Info</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Logout</BDropdownItem>
          </BDropdown>

          <BDropdown text="Success" variant="success" class="btn-group">
            <BDropdownItem href="#">Mark as Complete</BDropdownItem>
            <BDropdownItem href="#">Download Report</BDropdownItem>
            <BDropdownItem href="#">Submit Review</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Archive Task</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Sizing" isTogglable>
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <BDropdown variant="light" size="lg" text="Large button" class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown variant="light" size="lg" split text="Large button" class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown variant="light" size="sm" text="Small button" class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown variant="light" size="sm" split text="Small button" class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dropup Variation" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown variant="light" text="Dropup" end placement="top" class="btn-group">
            <BDropdownItem href="#">Upload File</BDropdownItem>
            <BDropdownItem href="#">Sync Data</BDropdownItem>
            <BDropdownItem href="#">Import from CSV</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Advanced Settings</BDropdownItem>
          </BDropdown>

          <BDropdown variant="light" text="Split dropup" placement="top" split class="btn-group">
            <BDropdownItem href="#">New Task</BDropdownItem>
            <BDropdownItem href="#">Assign User</BDropdownItem>
            <BDropdownItem href="#">Set Deadline</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Project Settings</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dropstart Variation" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown variant="secondary" text="Dropstart" placement="left" class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>

          <BDropdown variant="secondary" text="Split dropstart" placement="left" split class="btn-group">
            <BDropdownItem href="#">Action</BDropdownItem>
            <BDropdownItem href="#">Another action</BDropdownItem>
            <BDropdownItem href="#">Something else here</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Separated link</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dropend Variation" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown variant="primary" text="Dropend" placement="right" class="btn-group">
            <BDropdownItem href="#">View Profile</BDropdownItem>
            <BDropdownItem href="#">Message User</BDropdownItem>
            <BDropdownItem href="#">Report Issue</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Block User</BDropdownItem>
          </BDropdown>

          <BDropdown variant="primary" text="Split Dropend" placement="right" split class="btn-group">
            <BDropdownItem href="#">New Invoice</BDropdownItem>
            <BDropdownItem href="#">Send Reminder</BDropdownItem>
            <BDropdownItem href="#">Duplicate</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="#">Delete Invoice</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Active Item" isTogglable>
        <BDropdown variant="secondary" text="Active Item" class="btn-group">
          <BDropdownItem href="#">Regular link</BDropdownItem>
          <BDropdownItem active href="#">Active link</BDropdownItem>
          <BDropdownItem href="#">Another link</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Disabled Item" isTogglable>
        <BDropdown variant="secondary" text="Disable Item" class="btn-group">
          <BDropdownItem href="#">Regular link</BDropdownItem>
          <BDropdownItem disabled href="#">Disable link</BDropdownItem>
          <BDropdownItem href="#">Another link</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Headers" isTogglable>
        <BDropdown variant="secondary" text="Header" class="btn-group">
          <BDropdownHeader tag="h5">Dropdown header</BDropdownHeader>
          <BDropdownItem href="#">Action</BDropdownItem>
          <BDropdownItem href="#">Another action</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dark Dropdowns" isTogglable>
        <BDropdown variant="dark" text="Dark Dropdown" class="btn-group">
          <BDropdownItem href="#" active>Dashboard</BDropdownItem>
          <BDropdownItem href="#">My Orders</BDropdownItem>
          <BDropdownItem href="#">Billing Settings</BDropdownItem>
          <BDropdownDivider />
          <BDropdownItem href="#">Logout</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Centered Dropdowns" isTogglable>
        <div class="hstack gap-2">
          <BDropdown text="Centered dropdown" variant="secondary" menu-class="dropdown-center">
            <BDropdownItem>Action</BDropdownItem>
            <BDropdownItem>Action two</BDropdownItem>
            <BDropdownItem>Action three</BDropdownItem>
          </BDropdown>

          <BDropdown text="Centered dropup" variant="secondary" placement="top-center">
            <BDropdownItem>Action</BDropdownItem>
            <BDropdownItem>Action two</BDropdownItem>
            <BDropdownItem>Action three</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dropdown Options" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BDropdown variant="secondary" text="Offset" :offset="{ alignmentAxis: 10, crossAxis: 10, mainAxis: 20 }">
            <li>
              <BDropdownItem href="#">Profile Settings</BDropdownItem>
            </li>
            <li>
              <BDropdownItem href="#">Privacy Settings</BDropdownItem>
            </li>
            <li>
              <BDropdownItem href="#">Notification Preferences</BDropdownItem>
            </li>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Auto Close Behavior" isTogglable>
        <div class="hstack gap-2">
          <BDropdown text="Default dropdown" variant="secondary">
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
          </BDropdown>

          <BDropdown text="Clickable inside" variant="secondary" auto-close="inside">
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
          </BDropdown>

          <BDropdown text="Clickable outside" variant="secondary" auto-close="outside">
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
          </BDropdown>

          <BDropdown text="Manual close" variant="secondary">
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
            <BDropdownItem href="#">Menu item</BDropdownItem>
          </BDropdown>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Text" isTogglable>
        <BDropdown variant="primary" text="Text Dropdown" class="d-inline-block" menu-class="p-3 text-muted">
          <p>Some example text that's free-flowing within the dropdown menu.</p>
          <p class="mb-0">And this is more example text.</p>
        </BDropdown>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Forms" isTogglable>
        <BDropdown variant="secondary" text="Form" class="d-inline-block" menu-class="p-3">
          <BForm class="px-2 py-2" @submit.prevent>
            <div class="mb-3">
              <label for="dropdownEmail" class="form-label">Email address</label>
              <input type="email" class="form-control" id="dropdownEmail" placeholder="email@example.com" />
            </div>
            <div class="mb-3">
              <label for="dropdownPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="dropdownPassword" placeholder="Password" />
            </div>
            <div class="mb-2">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                <label class="form-check-label" for="dropdownCheck"> Remember me </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          </BForm>

          <BDropdownDivider />
          <BDropdownItem href="#">New around here? Sign up</BDropdownItem>
          <BDropdownItem href="#">Forgot password?</BDropdownItem>
        </BDropdown>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
</script>
