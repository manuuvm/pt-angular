import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/shared/model';
import { userEndpoints } from './api.endpoints';
import { UserService } from './user.service';

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  describe('getUsers', () => {
    it('should use GET method', () => {
      userService.getUsers().subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.method).toBe('GET');
    });

    it('should use the right url', () => {
      userService.getUsers().subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.url).toBe(userEndpoints.userApiRoute);
    });

    it('should receive the right users', () => {
      const mockUsers: User[] = [{ birthdate: new Date, id: 1, name: 'test' }];
      userService.getUsers().subscribe((users) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      req.flush(mockUsers);
    });
  })

  describe('getUserById', () => {
    it('should use GET method', () => {
      userService.getUserById(1).subscribe();
      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.method).toBe('GET');
    });

    it('should use the right url', () => {
      userService.getUserById(1).subscribe();
      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.url).toBe(userEndpoints.userByIdApiRoute(1));
    });

    it('should call getUserById and return the expected value', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };

      userService.getUserById(1).subscribe((user) => {
        expect(user).toBe(mockUser);
      });

      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    })
  })

  describe('newUser', () => {
    it('should use POST method', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };
      userService.newUser(mockUser).subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.method).toBe('POST');
    });

    it('should use the right url', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };
      userService.newUser(mockUser).subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.url).toBe(userEndpoints.userApiRoute);
    });

    it('should call newUser and return the expected value', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };

      userService.newUser(mockUser).subscribe((user) => {
        expect(user).toBe(mockUser);
      });

      const req = httpMock.expectOne(`${userEndpoints.userApiRoute}`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    })
  })

  describe('deleteUser', () => {
    it('should use DELETE method', () => {
      userService.deleteUser(1).subscribe();
      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.method).toBe('DELETE');
    });

    it('should use the right url', () => {
      userService.deleteUser(1).subscribe();
      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.url).toBe(userEndpoints.userByIdApiRoute(1));
    });

    it('should call deleteUser and return the expected value', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };

      userService.deleteUser(1).subscribe((user) => {
        expect(user).toBe(mockUser);
      });

      const req = httpMock.expectOne(userEndpoints.userByIdApiRoute(1));
      expect(req.request.method).toBe('DELETE');
      req.flush(mockUser);
    })
  })

  describe('updateUser', () => {
    it('should use DELETE method', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };
      userService.updateUser(mockUser).subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.method).toBe('PUT');
    });

    it('should use the right url', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };
      userService.updateUser(mockUser).subscribe();
      const req = httpMock.expectOne(userEndpoints.userApiRoute);
      expect(req.request.url).toBe(userEndpoints.userApiRoute);
    });

    it('should call updateUser and return the expected value', () => {
      const mockUser: User = { id: 1, birthdate: new Date(), name: 'test' };

      userService.updateUser(mockUser).subscribe((user) => {
        expect(user).toBe(mockUser);
        const req = httpMock.expectOne(userEndpoints.userApiRoute);
        expect(req.request.method).toBe('PUT');
      });
    })
  })
});
