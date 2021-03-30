import assert from 'assert';
import { config } from 'config';

describe('config', function () {
  describe('when imported', function () {
    it('should not be undefined.', function () {
      assert(config);
    });
  });

  describe('when accessing properties', function () {
    it('should have the [DB_USER] property defined', function () {
      assert(config.DB_USER !== undefined);
    });

    it('should have the [DB_PASSWORD] property defined', function () {
      assert(config.DB_PASSWORD !== undefined);
    });
  });
});
