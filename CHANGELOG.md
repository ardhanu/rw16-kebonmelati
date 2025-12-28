# CHANGELOG - Admin Dashboard Integration

## Version 1.1.0 - [Current Date]

### Added

- **Profile Synchronization**: Added automatic profile creation in `public.profiles` upon user registration. This ensures every new user has a corresponding profile record accessible by the Admin Dashboard.
- **Dynamic Service Catalog**: `ServicesList.tsx` now fetches service types from Supabase (`public.service_types`) instead of using hardcoded data.
- **Dynamic Requirements Rendering**: `RequestForm.tsx` can now render requirements dynamically, supporting both string and JSON array formats from the database.

### Changed

- **File Storage Structure**:
  - Updated `requestService.uploadDocument` to store files in the `requests` bucket.
  - New Path Structure: `{userId}/{serviceTypeId}/{fileName}`.
  - This structure aligns with the Admin Dashboard's RLS policies and organization strategy.
- **Service Request Submission**:
  - `createRequest` now accepts dynamic `serviceTypeId` and associates uploaded files with the correct service context folder.

### Fixed

- Fixed inconsistency where user data was not visible in the Admin Panel due to missing profile rows.

### Technical Notes for Admin Team

- **Database Dependency**: Ensure `public.service_types` table is populated. If empty, the Services page in the User App will show "Memuat layanan atau belum ada layanan tersedia...".
- **Storage Dependency**: Ensure the `requests` bucket exists and has appropriate RLS policies allowing authenticated users to upload to their own `{userId}/*` folders.
- **Legacy Data**: Pre-existing hardcoded services in `models.ts` are no longer used for the `/layanan` page.
